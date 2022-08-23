import { Connection } from './connect';
import { User } from './user';

export * as Connect from './connect';
export * as Join from './join';
export * as User from './user';
export * as EventsTypes from './events';
export * as ActionsTypes from './actions';

export type RootState = {
    loadLoading: boolean;
    loadSuccess: boolean;
    loadFail: boolean;
    servers: {
        [key: string]: Connection
    };
    users: {
        [key: string]: User[]
    };
    channels: {
        [key: string]: any[]
    };
    connections: {
        [key: string]: any
    };
    errors: {
        [key: string]: {}
    };
}
