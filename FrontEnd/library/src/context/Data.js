import React from 'react'

export const theme = {
    primary: {
        colorPrimary: "primary"
    },
    secondary: {
        colorSecondary: "secondary"
    }
}

const defaultData = {
    currentAuthor: null,
    books: [],
    authors: [],
    currentTheme: theme.primary
}

export const DataContext = React.createContext(defaultData)