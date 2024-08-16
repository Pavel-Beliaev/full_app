// import React, { FC, ReactNode } from 'react';
// import { Button } from '@nextui-org/react';
//
// type PropsType = {
//   children: ReactNode
//   icon: ReactNode
//   className: string
//   type?: 'button' | 'submit' | 'reset'
//   fullWidth?: boolean
//   color?:
//     'default' |
//     'primary' |
//     'secondary' |
//     'success' |
//     'warning' |
//     'danger'
// }
//
// export const MyButton: FC<PropsType> = ({
//                                           children,
//                                           icon,
//                                           className,
//                                           type,
//                                           fullWidth,
//                                           color,
//                                         }) => {
//   return (
//     <Button
//       startContent={icon}
//       size='lg'
//       color={color}
//       variant='light'
//       className={className}
//       type={type}
//       fullWidth={fullWidth}
//     >
//       {children}
//     </Button>
//   );
// };