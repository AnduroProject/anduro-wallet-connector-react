import { ConnectorVC } from "../components/connect/connectVC"
import { SendVC } from "../components/send/sendVC"
import { CreateAssetVC } from "../components/createAsset/createAssetVC"
import { TransferAssetVC } from "../components/transferAsset/transferAssetVC"
import { SignVC } from "../components/sign/signVC"
import { SendAlysVC } from "../components/sendAlys/sendAlysVC"
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
  {
    path: "/sendAlys",
    exact: true,
    component: SendAlysVC,
  },
]

export default routes
