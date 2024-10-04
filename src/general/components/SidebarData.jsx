// SidebarData.js

import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BookIcon from '@mui/icons-material/Book';

export const SidebarData = [
  {
    title: 'Mi Información',
    icon: <InfoIcon />,
    link: '/Perfil',
  },
  {
    title: 'Reportes',
    icon: <AssessmentIcon />,
    link: '/reportes', 
  },
  {
    title: 'Asignaturas',
    icon: <BookIcon />,
    link: '/asignaturas',
  },
];
