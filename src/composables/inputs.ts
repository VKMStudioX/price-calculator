export const useClearError = (args, state, v$) => {
  state[args.type] = ''
  v$.value[args.type].$reset()
}