import React from 'react'

export const theme = {
    primary: {
        colorPrimary: "primary",
        colorSecondary: "secondary"
    },
    secondary: {
        colorPrimary: "secondary",
        colorSecondary: "primary"
    }
}

const defaultData = {
    currentAuthor: null,
    books: [],
    authors: [],
    currentTheme: theme.primary
}

export const DataContext = React.createContext(defaultData)