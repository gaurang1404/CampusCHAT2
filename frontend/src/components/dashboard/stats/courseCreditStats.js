export const courses = [
    {
      label: 'JAVA',
      value: 4,
    },
    {
      label: 'DBMS',
      value: 4,
    },
    {
      label: 'ADA',
      value: 4,
    },
    {
      label: 'LA',
      value: 3,
    },
    {
      label: 'TFC',
      value: 3,
    },
    {
      label: 'SE',
      value: 2,
    },
    {
      label: 'UHV',
      value: 1,
    },
    {
      label: 'CP',
      value: 1,
    },
  ];
  
  export const coursesDistribution = [   
    ...courses.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : v.label,      
    })),
  ];
  
  export const valueFormatter = (item) => `${item.value}%`;