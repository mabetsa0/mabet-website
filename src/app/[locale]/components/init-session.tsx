import { getServerSession } from "@/lib/get-server-session"
import InitializeClientSession from "./init-client-session"

export async function InitSession() {
  const session = await getServerSession()

  return <InitializeClientSession initialValue={session} />
}
