export const apikey = 'AIzaSyCqe9gZt84-YMJDfle-YMZc5cGEtXPF5RQ';

export const value_converter = (value) =>{
    if(value >= 1000000){
        return Math.floor(value/1000000) + 'M'
    }else if(value >= 1000){
        return Math.floor(value/1000) + 'K'
    }else{
        return value
    }
}