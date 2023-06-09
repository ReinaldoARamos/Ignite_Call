import {styled, Heading, Text} from '@ignite-ui/react'

export const Container = styled('div', {

display: 'flex',
alignItems: 'center',
gap: '$20',
marginLeft: 'auto',
maxWidth: 'calc(100vw - (100vw - 1160px) / 2)', 
//Calculando o tamanho das sobras da tela e dividir por 2
//para aplicar margem somente na esquerda
height: '100vh',
})

export const Hero = styled('div', {
    maxWidht: 480,
    padding: '0 $10',
    
   [`> ${Heading}`]  : {

   },

   [`> ${Text}`]  : {
    marginTop: '$2',
    color: '$gray200',

   }
})

export const Preview = styled('div', {

'@media(max-width: 600px)' :{
display: 'none'
}
})
