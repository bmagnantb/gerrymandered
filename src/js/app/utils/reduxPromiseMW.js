const isPromise = val => val && typeof val.then === 'function'

export default ({dispatch}) => next => action => {
  if (isPromise(action.payload)) {
    const id = Symbol()

    dispatch({
      ...action,
      payload: null,
      meta: {
        sequence: {
          type: 'begin'
        }
      }
    })

    return action.payload.then(result => dispatch({
      ...action,
      payload: result,
      meta: {
        id,
        type: 'end'
      }
    }), error => dispatch({
      ...action,
      payload: error,
      error: true,
      meta: {
        sequence: {
          id,
          type: 'end'
        }
      }
    }))
  }

  return next(action)
}
