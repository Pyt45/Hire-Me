const initialState = {
    selectedId: -1,
    channels: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(action) {
        default:
            return state;
    }
}