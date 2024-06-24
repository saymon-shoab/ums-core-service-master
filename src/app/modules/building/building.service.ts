import { Building, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { buildingSearchAbleField } from "./building.constants";
import { IBuildingFilterRequest } from "./building.interface";

const insertIntoDB = async(data:Building): Promise<Building> => {
    const result = await prisma.building.create({
         data
    })
    return result 
}

const getAllFromDB = async(filter: IBuildingFilterRequest,options:IPaginationOptions  ): Promise<IGenericResponse<Building[]>> => {
    const {page,limit,skip} = paginationHelpers.calculatePagination(options);
    const {searchTerm} = filter;
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: buildingSearchAbleField.map((field)=>({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    const whereCondition: Prisma.BuildingWhereInput = andCondition.length> 0 ? {AND: andCondition} : {} ;
    
    const result = await prisma.building.findMany({
        skip,
        take: limit,
        where: whereCondition,
        orderBy: options.sortBy && options.sortBy ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = await prisma.building.count({
        where: whereCondition
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}
const getByIdFromDB = async (id: string): Promise<Building | null> => {
    const result = await prisma.building.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Building>): Promise<Building> => {
    const result = await prisma.building.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Building> => {
    const result = await prisma.building.delete({
        where: {
            id
        }
    });
    return result;
};


export const BuildingService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteByIdFromDB,
    updateOneInDB
}