import { ConnectorVC } from "../components/connect/connectVC"
import { SendVC } from "../components/send/sendVC"
import { CreateAssetVC } from "../components/createAsset/createAssetVC"
import { TransferAssetVC } from "../components/transferAsset/transferAssetVC"
import { SignVC } from "../components/sign/signVC"
const routes = [
  {
    path: "/",
    exact: true,
    component: ConnectorVC,
  },
  {
    path: "/send",
    exact: true,
    component: SendVC,
  },
  {
    path: "/createasset",
    exact: true,
    component: CreateAssetVC,
  },
  {
    path: "/transfer",
    exact: true,
    component: TransferAssetVC,
  },
  {
    path: "/sign",
    exact: true,
    component: SignVC,
  },
]

export default routes
