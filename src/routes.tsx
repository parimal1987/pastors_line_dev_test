import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Home } from "./pages";

function AppRoutes() {
    return (
        <Routes>
            <Route path='/'>
                <Route
                    index element={<Navigate to="contacts" replace />}
                />
                <Route path="contacts" element={<Home />} />
                <Route path="contacts/:country" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes

const PageNotFound = () => {
    return (
        <h1>Page Not Found</h1>
    )
}