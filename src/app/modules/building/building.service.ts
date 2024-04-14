import { Building } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async(data:Building): Promise<Building> => {
    const result = await prisma.building.create({
         data
    })
    return result 
}

const getAllFromDB = async() => {
    const result = await prisma.building.findMany();
    return result
}

export const BuildingService = {
    insertIntoDB,
    getAllFromDB
}