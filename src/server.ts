import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });


server.register(
    cors, {
    origin: "*",
});
const teams = [
    { id: 1, name: "Mercedes", base: "Brakley, United Kingdom" },
    { id: 2, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
    { id: 3, name: "Ferrari", base: "Maranello, Italy" },
    { id: 4, name: "McLaren", base: "Woking, United Kingdom" },
]

const drivers = [
    { id: 1, name: "George Russel", team: "Mercedes" },
    { id: 2, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 3, name: "Lewis Hamilton", team: "Ferrari" },
    { id: 4, name: "Lando Norris", team: "McLaren" },
]

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);

    return teams;
})
server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);

    return drivers
})

interface DriverParams {
    id: string;
}


server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(driver => driver.id === id);

    if (!driver) {
        response.status(404).send({ error: "Driver not found" });
        return { message: "Driver not found" };
    } else {
        response.type("application/json").code(200);
        return driver;
    }
});

server.listen({ port: 3333 }, () => {
    console.log("Server is running on http://localhost:3333");
})