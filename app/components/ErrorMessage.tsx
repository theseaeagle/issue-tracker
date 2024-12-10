import React, { PropsWithChildren } from 'react'
//import { Box, Button, Callout,Text, Container, TextArea, TextField, ThemePanel } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

const ErrorMessage = ({children}:PropsWithChildren) => {
  if(!children) return null;
  return (
    <Text color='red' as='p'>{children}</Text>
  )
}

export default ErrorMessage