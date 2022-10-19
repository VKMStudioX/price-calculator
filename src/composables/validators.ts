export const mustBeTrue = (value: boolean) => value

export const checkNumberValues = (value: string) => {
    if (/[^0-9.,]/g.test(value)) { 
        return false
    } else { 
        return true
    }
}