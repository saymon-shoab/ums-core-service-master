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

const update = z.object({
  body: z.object({
      title: z.string().optional(),
      code: z.string().optional(),
      year: z.number().optional(),
      startMonth: z.string().optional(),
      endMonth: z.string().optional()
  })
});


export const academicSemesterValidation = {
  create,
  update
};
