import { io } from "./server";
import { updateRoomById } from "./models/rooms";

export const newVote = async (room: any, activityId: string) => {
  const creatorSocket = await Array.from(
    io.sockets.adapter.rooms.get(room.shortId) || new Set<string>()
  ).values().next().value;
  io.to(await creatorSocket).emit("newVote", {
    activityId: activityId,
  });
};

export const startGame = async (
  proposal: any,
  roomData: any,
) => {
  const creatorSocket = await Array.from(
    io.sockets.adapter.rooms.get(roomData.roomId) || new Set<string>()
  ).values().next().value;
  io.to(roomData.roomId).emit("startGame", proposal);
  io.to(creatorSocket).emit("startGameHost", roomData);
  setTimeout(() => {
    runGame(proposal, roomData.roomId, roomData._id.toString(), creatorSocket, 0);
  }, 1000);
};

export const runGame = (
  proposal: any,
  shortIdRoom: string,
  idRoom: string,
  hostRoom: string,
  cont: number
) => {
  const activity = {
    _id: proposal.activities[cont]._id,
    name: proposal.activities[cont].name,
  };

  io.to(shortIdRoom).emit("nextActivity", activity);
  io.to(hostRoom).emit("nextActivityData", proposal.activities[cont]);
  setTimeout(async () => {
    if (proposal.activities.length > cont + 1) {
      runGame(proposal, shortIdRoom, idRoom, hostRoom, cont + 1);
    } else {
      updateRoomById(idRoom, { state: "finished" }).then((room) => { });
      io.to(shortIdRoom).emit("endRoom", "The room is finished");
      io.sockets.adapter.rooms.delete(shortIdRoom);
    }
  }, 10000);
};
