const initialState = {
    selectedId: -1,
    friends: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        default:
            return state;
    }
}