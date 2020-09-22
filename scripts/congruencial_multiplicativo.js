window.addEventListener('load', function () {

    class CongruencialMultiplicativo {

        getX_i(x0, a, m, tam) {
            var x_i = [];
            for (let index = 0; index < tam; index++) {
                a = (a * x0) % m;
                x_i.push(a);
            }
            return x_i;
        }

        getR_i(x_i, m) {
            let r_i = [];
            x_i.forEach(element => {
                r_i.push(element / m);
            });
            return r_i;
        }
        getN_i(r_i, a, b) {
            let n_i = [];
            r_i.forEach(element => {
                n_i.push(a + (b - a) * element);
            });
            return n_i;
        }

        createMatrix(x_i, r_i, n_i) {
            let result = [];
            for (let i = 0; i < r_i.length; i++) {
                let data = [];
                data.push(i + 1, x_i[i], r_i[i], n_i[i]);
                result.push(data);
            }
            return result;
        }

        createMatrixChi(frec_oct, frec_esp, chi) {
            let result = [];
            for (let i = 0; i < chi.length; i++) {
                let data = [];
                if (i == 0) {
                    data.push(i + 1, frec_oct[i], frec_esp, chi[i]);
                } else {
                    data.push(i + 1, frec_oct[i], frec_esp, chi[i]);
                }
                result.push(data);
            }
            return result;
        }

        getFe(tam) {
            let fe = [];
            for (let i = 0; i<5; i++){
                fe.push(tam/5);
            }
            return fe;
        }
        
        getFo(r_i) {
            let cont1 = 0;
            let cont2 = 0;
            let cont3 = 0;
            let cont4 = 0;
            let cont5 = 0;
            let contadores = [];
            r_i.forEach(element => {
                if (element >=0 && element<0.2){
                    cont1++;
                }
                else if (element >=0.2 && element<0.4){
                    cont2++;
                }
                else if (element >=0.4 && element<0.6){
                    cont3++;
                }
                else if (element >=0.6 && element<0.8){
                    cont4++;
                }
                else if (element >=0.8 && element<=1.0){
                    cont5++;
                }
            });
            contadores.push(cont1,cont2,cont3,cont4,cont5);
            return contadores;
        }

        getChi(fo,fi){
            let chi = []
            for (let i = 0; i < fo.length; i++){
                chi.push(parseFloat((Math.pow((fo[i] - fi), 2) / fi).toFixed(3)));
            }
            return chi;
        }

        getTotalChi(chi){
            let acum = 0;
            for(let i = 0; i<chi.length;i++){
                acum+=chi[i];
            }
            return acum;
        }

        getResult(chi){
            return 9,48772904>chi;
        }

        getS(ri){
            let s = [];
            let mayor = 0;

            console.log(ri.length +"tamaño")

            for(let i = 0; i < ri.length && i+1<ri.length; i++){
                mayor = ri[i];
                if(ri[i+1]>mayor){
                    mayor = ri[i+1];
                    s.push(1); 
                
                }else{
                    s.push(0);
                }
            }
            return s;
        }

        getCorridas(s){
            let corridas = [];
            for(let i = 0; i < s.length && i+1<s.length; i++){
                corridas.push(Math.abs(s[i+1]-s[i]));
            }
            return corridas;
        }

        getCo(corridas){
            let acum = 0;
            for(let i = 0; i < corridas.length; i++){
                if(corridas[i] == 1){
                    acum += corridas[i];
                }
            }
            return acum;
        }

        getValEsperado(n){
            return ((2*n)-1)/3;
        }

        getVarianza(n){
            return ((16*n)-29)/90;
        }

        getEstadistico(co,valEsp,varianza){
            return Math.abs((co-valEsp)/Math.sqrt(varianza));

        }

        getValTablas(valEstadistico){
            return 1,96>valEstadistico;

        }

        createMatrixCorridas(valEsperado, valEstadistico) {
            let result = [];
            let data = [];
            
            data.push(1, valEsperado, valEstadistico);
            
            result.push(data);
            
            return result;
        }


        
    }

    document.querySelector("#congr_mult_play").addEventListener('click', function () {
        cm = new CongruencialMultiplicativo();
        //Entrada de datos
        let x_0 = parseInt(document.querySelector("#cm_x_0").value);
        let t = parseInt(document.querySelector("#cm_t").value);
        let g = parseInt(document.querySelector("#cm_g").value);
        let min = parseInt(document.querySelector("#cm_min").value);
        let max = parseInt(document.querySelector("#cm_max").value);
        let tam = parseInt(document.querySelector("#tam").value);
        //calculos
        let a = (8 * t) + 3;
        let m = Math.pow(2, g);

        let x_i = cm.getX_i(x_0, t, g, tam);
        let r_i = cm.getR_i(x_i, g);

        let n_i = cm.getN_i(r_i, min, max);

        

        //Guardar en sesion
        sessionStorage.clear();
        sessionStorage.setItem("ri", JSON.stringify(r_i));

        // pintar en la tabla
        var table = document.querySelector("#table-cm");
        createTableNums(table, cm.createMatrix(x_i, r_i, n_i), "#table-cm>tbody");
    });

    function createTableNums(table, data, replace) {
            var body = document.createElement("tbody");
            for (let i = 0; i < data.length; i++) {
                var tr = document.createElement("tr");
                for (let j = 0; j < data[i].length; j++) {
                    var td = document.createElement("td");
                    var value = document.createTextNode(data[i][j])
                    td.appendChild(value);
                    tr.appendChild(td);
                }
                body.appendChild(tr);
            }
            //var new_tbody = document.createElement('tbody');
            table.replaceChild(body, document.querySelector(replace));
    }

    

    document.querySelector("#chisq_play").addEventListener('click', function () {
        
        let x_0 = parseInt(document.querySelector("#cm_x_0").value);
        let t = parseInt(document.querySelector("#cm_t").value);
        let g = parseFloat(document.querySelector("#cm_g").value);
        let tam = parseInt(document.querySelector("#tam").value);

        let fe = tam/5;
        let fo = cm.getFo(cm.getR_i(cm.getX_i(x_0,t,g,tam),g));
        let chi = cm.getChi(fo,fe);
        let total = cm.getTotalChi(chi);

        let result = cm.getResult(total)
        let textResult = "Se rechaza H0";
        if (result){
            textResult = "No se rechaza H0";
        }





        var table_2 = document.querySelector("#table-chi_2");

        createTableChi(table_2, cm.createMatrixChi(fo,fe,chi),"#table-chi_2>tbody")
        document.querySelector("#result_chi").innerHTML = "Chi cuadrado = "+ total+ "<br>" +textResult;

        


    });

    function createTableChi(table, data, replace) {
        var body = document.createElement("tbody");
        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < data[i].length; j++) {
                var td = document.createElement("td");
                var value = document.createTextNode(data[i][j])
                td.appendChild(value);
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
        //var new_tbody = document.createElement('tbody');
        table.replaceChild(body, document.querySelector(replace))
    }

    document.querySelector("#corridas_play").addEventListener('click', function () {
        let x_0 = parseInt(document.querySelector("#cm_x_0").value);
        let t = parseInt(document.querySelector("#cm_t").value);
        let g = parseInt(document.querySelector("#cm_g").value);
        let tam = parseInt(document.querySelector("#tam").value);

        let x_i = cm.getX_i(x_0, t, g, tam);
        let r_i = cm.getR_i(x_i, g);
        let s = cm.getS(r_i);
        let corridas = cm.getCorridas(s);
        let co = cm.getCo(corridas);

        let valEsperado = cm.getValEsperado(tam);
        let varianza = cm.getVarianza(tam);
        let valEstadistico = cm.getEstadistico(co,valEsperado,varianza);

        let result = cm.getValTablas(valEstadistico)
        let textResult = "Se rechaza H0";
        if (result){
            textResult = "No se rechaza H0";
        }

        
        var tableCorridas = document.querySelector("#table-corridas");

        createTableCorridas(tableCorridas,cm.createMatrixCorridas(valEsperado,valEstadistico),"#table-corridas>tbody")
        document.querySelector("#result_corridas").innerHTML = textResult;





        

    });

    function createTableCorridas(table, data, replace) {
        var body = document.createElement("tbody");
        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < data[i].length; j++) {
                var td = document.createElement("td");
                var value = document.createTextNode(data[i][j])
                td.appendChild(value);
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
        //var new_tbody = document.createElement('tbody');
        table.replaceChild(body, document.querySelector(replace))
    }
});

    



    
