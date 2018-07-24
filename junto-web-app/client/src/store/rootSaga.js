import { loginFlow, watchAuthCheck } from './features/authentication/sagas'


export default function* rootSaga() {
  yield [
    loginFlow(),
    watchAuthCheck()
  ]
}
