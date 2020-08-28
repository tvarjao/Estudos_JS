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
                if(type === 'inc'){
                    data.budget += value;    
                } else if (type === 'exp'){
                    data.budget -= value;
                }
                
                
                return newReg;
            }
            //
        },
        getBudget: function(){
            return {
                income: data.totals.inc,
                expenses: data.totals.exp,
                budget: data.budget
            }
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
        valueInput: '.add__value',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
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
            
        },
        addItem: function(type, register) {
            var htmlItem, elementSelector, newItem;
            
            if(type === 'inc'){
                elementSelector = componentUI.incomeList;
                htmlItem = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                elementSelector = componentUI.expensesList;
                htmlItem = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newItem = htmlItem.replace('%id%', register.id);
            newItem = newItem.replace('%desc%', register.description);
            newItem = newItem.replace('%value%', register.value);
            
            document.querySelector(elementSelector).insertAdjacentHTML('beforeend', newItem);
        },
        updateBudget: function(budget) {
            document.querySelector(componentUI.budgetLabel).textContent = budget.budget;
            document.querySelector(componentUI.incomeLabel).textContent = budget.income;
            document.querySelector(componentUI.expenseLabel).textContent = budget.expenses;            
        },
    }
    
    
    
})();

var Controller = (function(budgetyCtrl, uiCtrl){
    function addRegister(){
        var inputs, register, budget;
        
        inputs = uiCtrl.getInputs()
        
        register = budgetyCtrl.addReRister(inputs)
        
        uiCtrl.clearInputs();
        
        uiCtrl.addItem(inputs.type, register);
        
        budget = budgetyCtrl.getBudget();
        
        uiCtrl.updateBudget(budget);
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