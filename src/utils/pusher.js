import Pusher from "pusher-js";

const pusher = new Pusher("fa9c90ac06ced200fbce", {
  appId: "1196955",
  key: "fa9c90ac06ced200fbce",
  secret: "cee84333022f1528663f",
  cluster: "eu"
});

export default pusher;
