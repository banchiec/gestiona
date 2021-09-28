import { Route, Switch } from "react-router"
import UserRoutes from './UserRoutes/UserRoutes'
import AppointmentRoutes from './AppointmentRoutes/AppointmentRoute'
import AuthRoutes from "./AuthRoutes/AuthRoutes"

const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <AuthRoutes storeUser={storeUser} />
            <UserRoutes loggedUser={loggedUser} />
            <AppointmentRoutes></AppointmentRoutes>
        </Switch>
    )
}
export default Routes