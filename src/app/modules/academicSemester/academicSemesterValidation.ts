import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'year is required',
    }),
    title: z.string({
      required_error: ' Title is Required',
    }),
    code: z.string({
      required_error: 'Code is Required',
    }),
    startMonth: z.string({
      required_error: 'Start month is required',
    }),
    endMonth: z.string({
      required_error: 'End month is required',
    }),
  }),
});

export const academicSemesterValidation = {
  create,
};
