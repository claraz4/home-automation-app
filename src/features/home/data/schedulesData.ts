export const schedulesData = {
  days: [
    {
      date: new Date(2025, 11, 24),
      timeSlots: [
        {
          time: "09:00",
          schedules: [
            {
              id: 1,
              name: "Schedule Name 1",
              deviceCount: 4,
            },
            {
              id: 2,
              name: "Schedule Name 2",
              deviceCount: 3,
            },
          ],
        },
        {
          time: "23:00",
          schedules: [
            {
              id: 3,
              name: "Schedule Name 1",
              deviceCount: 4,
            },
          ],
        },
      ],
    },
    {
      date: new Date(2025, 11, 26),
      timeSlots: [
        {
          time: "12:00",
          schedules: [
            {
              id: 4,
              name: "Schedule Name 1",
              deviceCount: 4,
            },
            {
              id: 5,
              name: "Schedule Name 2",
              deviceCount: 3,
            },
          ],
        },
      ],
    },
  ],
};
