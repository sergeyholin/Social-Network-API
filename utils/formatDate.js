module.exports ={ 
format_time: (timestamp) => {
    return timestamp.toLocaleTimeString();
},
    format_date: (timestamp) => {
    return `${new Date(timestamp).getMonth() + 1}/${new Date(timestamp).getDate()}/${new Date(timestamp).getFullYear() + 5
        }`;
    },
    };
    