# Relish QA Automation Engineer Technical Test
QA Automation Engineer technial test

## Descripcion 
Para la elavoracion de los casos se utilizo Visual Studio Code en conjunto con Copilot. 
Se extrajieron fragmentos del documento y se crearon archivos MD para la soluciones de cada parte. 

### Parte 1 
 - [CodeReview OrderProcessor](codereview_orderprocessor.md)
    - Se genero un md para la revision de codereview del codigo de Order processor
    - Este md genero el report de bugs como fue solicitado [BUG REPORT](BUG-REPORT.md) que contiene los issues encontratos tanto codigo como de logica

- [BUG REPORT](BUG-REPORT.md)
    - Se encontro un bug a nivel de codigo. Luego de analizar el codigo se realizaron pruebas y en efecto fue un error bastante comun en el manejo de un ciclo.
    - [MD Revsion de Reglas del negocio](businessrulesreview_orderprocessor.md) Con este MD Se encontro un error logico en relacion a la regla del negocio. El error consistia en el manejo de los Cupones.
    - Los issues fueron reportados con el formato y contexto requerido. 

- [Order Processor Fixed](order-processor.fixed.js)
    - Se genero un nuevo archivo con las correciones tanto en el codigo como en la logica 
    - [Resultado de Unit Test Archivo Corregido](UnitTestResults_orderprocessor.FIXED.md)

- [Jest Unit Test - Archivo original](order-processor.UNfixed.test.js) 
    - Honestamente esta es la primera vez que utilizo Jest para hacer unit tests. 
    - Revise en google cual recomendaban si mocha o Jest y pues por lo que entendi estos son mas robustos que mocha. 
    - Siempre con copilot pedi que me genrara los Unit test en Jest en base al archivo original 
    - [Resultado de Unit Test Archivo Original](UnitTestResults_orderprocessor.UNFIXED.md)

- [Jest Unit Test - Archivo fixed](order-processor.fixed.js)
    - Usando copilot nuevamente se genraron los unit tests pero utilizando el order processor ya con sus issues resueltas.
    - Instale un plugin para correr los test cases segun yo lo necesitaba y es Jest / Vitest Runner (luego de probar varios y solo se volvian cada vez mas complicados)

- [Archivo con Resultado de Unit Tests Jest](OrderProcessor_UTestResult.md)

### Parte 2 
- [Code Coverage](CodeCoverate_Parte1.md)
    - Esto tambien fue nuevo para mi, pero investigue que es lo que conlleva y pues le pedi a copilot que me hiciera un code coverage en base al archivo ya corregido. 
    - Luego revise el resultado y pues en lo que logre comprender, esta bastante completo. 

### Parte 3 
- [Archivo Base para Estructura de Test Cases](<Part 3/genTestCases.md>)
    - Se creo este archivo para utilizarlo como base para la generacion de los test cases para cada uno de los Escenarios

- Escenario A  - Ajax 
    - [Instrucciones](<Part 3/scenarioA.md>) extracto de documento original con las instrucciones a seguir
    - Luego de utilizara la estructura de los test cases y que me creara el archivo con las pruebas
    - [Test Cases ](<Part 3/scenarioA_TestCases.md>) Archivo con todos los test cases  
    - Lo Challenging de aca era el manejo del Ajax y el conteo del tiempo en relacion a presionar el boton y el despliegue del label.  Obviamente a nivel manual es complicado , ya que hay que tener un cronometro para confiarmar que no exceda los 15segs que se mensionaron. 

- Escenario B  - Login 
    - [Instrucciones](<Part 3/scenarioB.md>) extracto de documento original con las instrucciones a seguir
    - Luego de utilizara la estructura de los test cases y que me creara el archivo con las pruebas
    - [Test Cases ](<Part 3/scenarioB_TestCases.md>) Archivo con todos los test cases 
    - Lo challenging de aca era la convinacion de pruebas que se pueden realizar en este caso, ya que por ser login es un tema que si se tiene que probar a profundidad.

- Escenario C  - Dynamic 
    - [Instrucciones](<Part 3/scenarioC.md>) extracto de documento original con las instrucciones a seguir
    - Luego de utilizara la estructura de los test cases y que me creara el archivo con las pruebas
    - [Test Cases ](<Part 3/scenarioC_TestCases.md>) Archivo con todos los test cases 
    - Lo Challenging de esto es que hay que tener un conocimiento de como debugiar la pagina, ver el codigo, saber donde buscar un Selector, ID, etc.. para poder confirmar el cambio al darle refresh y que el texto esta siendo ingresado en la pagina de overlaped. 

# *Aqui si la vi dificil!!*
### Parte 4 
Siguiendo los requisitos para la implementacion de la Automatizacion, yo utilice Playwright ya que es el framework el cual he empezado a utilizar actualmente y recibiendo curso como se los mencione en la entrevista. 

Siempre utilizando copilot segui estos pasos:
- Que utilizara este [Que son las condiciones solicitadas](<Part 4/automation_conditions>)
    - Creara page object model
    - Propper waiting strategies (esto si no se mucho , a puras penas he utilizado awaits)
    - Meaningful Assertions
    - Reslient Selectors (esto si me provoco muchos problemas, tantos que al final lo quite como condicion para la generacion de los scripts por que me generaban muchos errores y pues lo poco que se de selectors no me ayudo mucho que digamos.)
    - Estas son las paginas que se crearon
        - [Escenario A - Ajax](<Part 4/pages/AjaxPage.js>)
        - [Escenario B - Login](<Part 4/pages/LoginPage.js>)
        - [Escenario C - DynamicElemnts](<Part 4/pages/DynamicElementsPage.js>)
    - Al solictar que me genrara los automations scripts en base a los escenarios de la parte 3 
        - [Tests - Escenario A](<Part 4/tests/ajax.spec.js>)
        - [Tests - Escenario B](<Part 4/tests/login.spec.js>)
        - [Tests - Escenario C](<Part 4/tests/dynamic-elements.spec.js>)
    - Problemas que me encontre:
        - La ejecucion de los scripts me genero muchos errores 
            - Que no podia ajecutar headless 
            - Todos los test cases me salian fallidos 
            - Me hacian falta dependencias 
            - Creaba y borraba archivos , hacia en base a los Testcases de parte 3 , luego borraba y que los hiciera directamente en relacion a la pagina (objeto) y tampoco 
            - Entre tanto prueba y error logre identificar que el problema era el plugin de Jest 
            - Lo des habilite y ya me corrio un Test case 
            - Luego a empezar desde Cero ya sin el Jest y ahi si ya me corrieron los Test cases , bueno casi todos 
            - El escenario C del dinamic con los selectors, honestamente no me jalo al 100 ya que esto es por todo ese tema de los selectors y lo dinamico, etc.. solo pasaron unos otros fallaron y si no mucho entendi por que. 
            - Al final se genero este archivo [Tests Escenario C](<Part 4/SCENARIO_C_IMPLEMENTATION.md>) donde da una descripcion de las pruebas dinamicas y del overlap que se realizaron y pues honestamente mentiria si digo que entiendo si esta bien o esta mal. 

## Parte 5
Esta parte basicamente solo formatie la tabla y un poco las preguntas que mencionan en el documento y pedi a copilot que la analizara y proporcionara las respuestas. 

Luego de ver el resultado fui verificando parte por parte tener un doublecheck de la solucion y si cubrio hasta un poco mas en relacion al motivo del problema ya que mi experiencia llegaba de ver cambios en el codigo que es lo mas frecuente y deploys asi sin avisar o bien algo a nivel de infra estructura , como disco lleno , falta de memoria o algo de lo cual ya he tenido experiencia mas que he trabajdo con ambientes virtuales. 

[KPIS - Solucion](<Part 5/kpis.md>)

## Parte 6
Aqui solo pedi que me creara un Github Actions utilizando los unit test de jest , ya que esto tengo la logica por los cursos que he recibido pero mentiria si digiera que la he implementado. 

[Folder con los yml](.github/workflows) digo los, por que me genero tambien los actions para playwright.