var BudgetyConttoller = (function(){
    
    var Register = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    
    //var Income...
    
    var data = {
        items:{ inc:[],
                exp:[]
              },
         totals:{ inc: 0,
                  exp: 0
              },
        budget: 0
    };
    return {
        addReRister: function(reg){
            var type, ID, value;
            
            type = reg.type;
            
            value = parseFloat(reg.value);
            
            if(reg.description !== '' && !isNaN(value) && value !== 0){
                
                if(data.items[type].length == 0){
                    ID = 0;
                } else {
                    ID = data.items[type][data.items[type].length - 1].id + 1;    
                }
                
                var newReg = new Register(ID, reg.description, value);
                
                data.items[type].push(newReg);
                data.totals[type] += value;
                data.budget += value;
                
                return newReg;
            }
            //
        },
//metodo de teste dos dados internos
        showData: function(){
            console.log(data);
        }
    };
})();

var UIController = (function(){
    
    var componentUI = {
        typeSelect: '.add__type',
        descInput: '.add__description',
        valueInput: '.add__value'
    };
    
    return {
        getInputs: function() {
            return {
                type: document.querySelector(componentUI.typeSelect).value,
                description: document.querySelector(componentUI.descInput).value,
                value: document.querySelector(componentUI.valueInput).value
            };
        },
        clearInputs: function(){
            document.querySelector(componentUI.descInput).value = "";
            document.querySelector(componentUI.valueInput).value = "";
        },
        addItem: function(type, item){
            
        }
    }
    
    
    
})();

var Controller = (function(budgetyCtrl, uiCtrl){
    function addRegister(){
        var inputs = uiCtrl.getInputs()
        
        budgetyCtrl.addReRister(inputs)
        
        uiCtrl.clearInputs();
        //budgetyCtrl.showData();
    }
    //button click
    document.querySelector('.add__btn').addEventListener('click', function(){
        addRegister();
    });
    
    //Enter press
    document.addEventListener('keypress', function(e){
        if(e.charCode === 13){
            addRegister();
        }
    });
})(BudgetyConttoller, UIController);