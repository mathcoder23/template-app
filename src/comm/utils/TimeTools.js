export const TimeTools = {
    formatNextTime:(next)=>{
        let current =  new Date()
        if(typeof next === 'string'){
            next = next.replace(/\-/g, "/")
        }
        if(next){
            let date = new Date(next).getTime()/1000
            let cTime = current.getTime()/1000
            if(date < cTime){
                let d = cTime-date
                if(d > 24*60*60){
                    //day
                    return parseInt(d/(24*60*60))+"天前"
                }else if(d > 60*60){
                    return parseInt(d/(60*60))+"小时前"
                }else if(d > 60){
                    return parseInt(d/(60))+"分钟前"
                }else{
                    return parseInt(d)+"秒前"
                }
            }else{
                let d = date - cTime
                if(d > 24*60*60){
                    //day
                    return parseInt(d/(24*60*60))+"天后"
                }else if(d > 60*60){
                    return parseInt(d/(60*60))+"小时后"
                }else if(d > 60){
                    return parseInt(d/(60))+"分钟后"
                }else{
                    return parseInt(d)+"秒后"
                }
            }

        }else{
            return ''
        }
    }
}
