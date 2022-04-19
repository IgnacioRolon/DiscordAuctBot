import { ICommand } from "wokcommands";

export default {
    category: 'Development',
    description: 'Replies with pong',
    slash: 'both',
    testOnly: true,

    callback: ({ }) => {
        return 'Pong'
    }
} as ICommand;