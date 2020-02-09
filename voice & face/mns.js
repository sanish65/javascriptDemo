
var neut,hap,sa,surp,fear,disgust,ang=0;
var db2=openDatabase("itemDB","1.0","itemDB",65535);
        $(function(){
        
        loadData();
        
             
        //to fetch
        var a,b,c=0;
        
        $("#list").click(function(){
        loadData();
        })
        
        function loadData(){
            $("#itemlist").children().remove();
          db.transaction(function(transaction){
            var sql="SELECT * FROM items ORDER BY id DESC";
            transaction.executeSql(sql,undefined,function(transaction,result){
        if(result.rows.length){
        
        for(var i=0;i<result.rows.length;i++){
          var row=result.rows.item(i);
          var item=row.item;
          var id=row.id;
          if( item[i]=="neutral")
          {
            neut++;

          }
          if( item[i]=="happy")
          {
            hap++;

          }
          if( item[i]=="sad")
          {
            sa++;

          }
          if( item[i]=="fearful")
          {
            fear;

          }
          if( item[i]=="surprised")
          {
            surp;

          }
          if( item[i]=="fearful")
          {
            fear++;

          }
          if( item[i]=="disgusted")
          {
            disgust++;

          }
          if( item[i]=="angry")
          {
            ang++;

          }
          const emo = [neut,hap,sa,ang,fear,disgust,surp];
     
          const largestValue1 = (values) => {
            let highest= 0 ;
            for(let i=0; i<values.length; i+=1){
              if (values[i] > highest)
              {
                highest = values[i];
              }
            }
            if(highest == emo[0])
            return "neutral";
            if(highest == emo[1])
            return "happy";
            if(highest == emo[2])
            return "sad";
            if(highest == emo[3])
            return "angry1111";
            if(highest == emo[4])
            return "fearful";
            if(highest == emo[5])
            return "disgusted";
            if(highest == emo[6])
            return "surprised";
               }
         comm2 = largestValue1(emo);
          // console.log("this is finalize result".comm2);        
            

        }
        }else{
          return "no emotions";
        }
        
        
            },function(transaction,err){
              return "no emotions";
            })
          })
        }
        
        })