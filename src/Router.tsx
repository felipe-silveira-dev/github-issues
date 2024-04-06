import { Routes, Route } from "react-router-dom"
import Issues from "./Issues"
import Details from "./Details"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="/issues/:id" element={<Details />} />
        </Routes>
    )
}

export default Router