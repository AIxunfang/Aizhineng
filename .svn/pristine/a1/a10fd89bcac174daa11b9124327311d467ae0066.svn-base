
// 修改state 中 某一属性值

export const changeDefaultText = (state, data) => {
     console.log("--------------")
    console.log(data);

            for(let i = 0; i< data.length;i++) {
                for(let j = i +1;j < data.length; j++) {
                      if(data[i].title===data[j].title){
                           data.splice(j,1)
                           j--;
                           i--
                      
                
                    }

                      
                }
            }


    state.defaultText = data
}