export interface User {
    nick: string,
    ident: string,
    hostname: string,
    modes?: string[],
    tags?: any;
    channel?: string,
}
