import { ChannelName, Hostname, Ident, Modes, Nick, Tags } from "./common";

export interface User {
    nick: Nick,
    ident: Ident,
    hostname: Hostname,
    modes?: Modes,
    tags?: Tags;
    channel?: ChannelName,
}
