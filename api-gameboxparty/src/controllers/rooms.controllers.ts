import express from "express";
import * as RoomModel from "../models/rooms";
import * as UserModel from "../models/users";
import { getProposalById } from "../models/proposals";
import { startGame, newVote } from "../socket";
import { getActivityById } from "../models/activities";

const rooms : any[] = [];

export const getRooms = async (req: express.Request, res: express.Response) => {
  try {
    const rooms = await RoomModel.getRooms();
    return res.status(200).json(rooms).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getRoomById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "roomId is required" });
    }

    const room = await RoomModel.getRoomById(id);
    return res.status(200).json(room).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { name, proposalId, hostedBy } = req.body;

    if (!name || !proposalId || !hostedBy) {
      return res.status(400).json({ message: "Name and proposal are required" });
    }

    const user = await UserModel.getUserById(hostedBy);

    const room = await RoomModel.createRoom({
      name,
      proposal: proposalId,
      hostedBy,
      hostedByName: user.username,
      roomId: Math.random().toString(32).substring(4, 8).toUpperCase(),
    });

    return res.status(200).json(room).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const connectRoom = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const username : string = req.body.username;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  const room = await RoomModel.getRoomByRoomId(id);
  
  if (!room) {
    return res.status(400).json({ message: "Room not found" });
  }
  if(room.state === "finished"){
    return res.status(400).json({ message: "Room is finished" });
  }
  if(room.state === "running"){
    return res.status(400).json({ message: "Room is running" });
  }
  console.log(room.id);
  const updateRoom = await RoomModel.updateRoomById(room.id, {
    participants : [...room.participants, username]
  });

  if (!updateRoom) {
    return res.status(400).json({ message: "Error updating room" });
  }

  return res.status(200).json(updateRoom).end();
}

export const startRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "roomId is required" });
    }
    const room = await RoomModel.getRoomById(id);

    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }
    if (room.state != "waiting") {
      return res.status(400).json({ message: "Room is not waiting" });
    }

    const newRoom = await RoomModel.updateRoomById(id, {
      state: "running",
    });

    const proposal = await getProposalById(newRoom.proposal.toString());
    if (!proposal) {
      return res.status(400).json({ message: "Proposal not found" });
    }
    const activitiesData = [];
    const activitiesDataVote = [];
    for (const activityId of proposal.activities) {
      const activity = await getActivityById(activityId.toString());
      if (activity) {
        activitiesData.push(activity);
        activitiesDataVote.push({ activity: activity, votes: 0 });
      }
    }

    const roomWithVotes = {
      roomId: newRoom._id.toString(),
      shortId: newRoom.roomId,
      votes: activitiesDataVote
    }
    const proposalWithData = {
      proposal,
      activities: activitiesData,
    };

    rooms.push(roomWithVotes);

    startGame(proposalWithData, newRoom);

    return res.status(200).json(room).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const voteRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { activityId, vote } = req.body;

    if (!id || !activityId || !vote) {
      return res.status(400).json({ message: "roomId, activityId and vote are required" });
    }
    
    const room = rooms.find((room) => room.roomId === id);
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }

    const voteActivity = room.votes.find((v: any) => v.activity._id.toString() === activityId);
    if (voteActivity) {
      if (voteActivity.votes + vote < 0) {
        voteActivity.votes = 0;
      } else {
        voteActivity.votes += vote;
      }
    } else {
      return res.status(400).json({ message: "Activity not found" });
    }

    newVote(room, activityId);
    return res.status(200).json(voteActivity).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getRoomVotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "roomId is required" });
    }

    const room = rooms.find((room) => room.roomId === id);
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }

    const votes = room.votes.sort((a : any, b : any) => b.votes - a.votes);

    return res.status(200).json(votes).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}