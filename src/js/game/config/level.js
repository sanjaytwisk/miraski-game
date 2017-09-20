export default {
    map: {
        t: {
            list: 'trees',
            mesh: 'tree'
        },
        j: {
            list: 'jagermeisters',
            mesh: 'jagermeister'
        },
        r: {
            list: 'stones',
            mesh: 'stone'
        }
    },
    active: {
        tree: [],
        stone: [],
        jagermeister: []
    },
    modes: [
        {
            mode: 'insane',
            value: 3000
        },
        {
            mode: 'brutal',
            value: 2000
        },
        {
            mode: 'hard',
            value: 1000
        },
        {
            mode: 'medium',
            value: 400
        },
        {
            mode: 'easy',
            value: 0
        }
    ]
}
