import nodemailer from "nodemailer"

export const sendEmail1 = async (correo, nombreInstructor, estudiantes) => {
    try {
        let pass = process.env.EMAIL_PASS;
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        })
        // Obtener la fecha actual
        const fechaActual = new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        // Crear la tabla de estudiantes
        const estudiantesTabla = estudiantes.map((estudiante, index) => 
            `${index + 1}\t${estudiante.programa}\t${estudiante.area}\t${estudiante.ficha}\t${estudiante.ccTi}\t${estudiante.apellidos}`
        ).join('\n');
        const mailOptions = {
            from: '"Etapas Productivas SENA" <etapasproductivascat@sena.edu.co>',
            to: correo,
            subject: "NOTIFICACIÓN ASIGNACIÓN COMO INSTRUCTOR DE SEGUIMIENTO",
            text: `
Fecha: ${fechaActual}

Cordial saludo estimado instructor ${nombreInstructor},

Adjunto listado con asignaciones de seguimientos de etapa productiva para su gestión y apoyo.

No\tPROGRAMA DE FORMACIÓN\tAREA\tFICHA\tCC-TI\tAPELLIDOS
${estudiantesTabla}

La base de datos en el Excel está en su drive con los datos totales.

Es muy importante contactar los aprendices cuanto antes, ya que según reglamento del aprendiz debemos realizar el 1er seguimiento los 15 primeros días para
establecer las actividades a realizar y orientarlo sobre el proceso. Aunque en algunos casos pasamos ya esta fecha por demoras en la asignación lo invitamos a 
gestionar cuanto antes la comunicación.

Recuerde la importancia de llevar un correcto seguimiento tomando y seguir las siguientes recomendaciones:
1. El primer seguimiento debe hacerse cuanto antes para acordar las actividades con su coformador(jefe) (15 días al iniciar en lo posible si dan los tiempos una vez
 asignados)
2. Son en total 3 seguimientos (iniciando, a mitad y finalizando), es nuestro deber cumplir con los tiempos.
3. Asegúrese de recibir cada 15 días la bitácora que corresponde en la fecha asignada, de lo contrario citar a comité académico por incumplimiento del aprendiz. No
 dejemos que el aprendiz se acumule bitácoras sin entregar.
4. Maneje el correo y el drive que compartir desde etapas productivas para el seguimiento suyo, en el cual debe guardar la información con los seguimientos, 
bitácoras y documentos de certificación al día, es decir es su deber alimentarla constantemente y tenerla actualizada.
5. Las firmas de los documentos son muy importantes ya que convalidan la autenticidad del documento cargue todos los documentos firmados. (La firma no puede 
ser letras escritas en word)
6. Revise las fechas recuerde que las fichas se vencen por tiempo y hay unos tiempos máximos (2 años al finalizar su lectiva) para realizar su etapa productiva y el 
trámite de certificación, trabajemos para avisar a los aprendices que no deje pasar estos tiempos ya que puede ser declarado en deserción. Si hay alguna 
situación en la que estemos justos de tiempos notificar al equipo de etapas productivas para apoyar con un trámite ágil.
7. Cite a comités cuando el aprendiz incumpla los tiempos, las entregas y haya novedades disciplinarias y académicas, es su responsabilidad como instructor de seguimiento.
8. Dejemos evidencias por correo electrónico, no por WhatsApp de su gestión con los aprendices
9. Registre una vez terminado los 3 seguimientos la calificación en Sofia, es su responsabilidad cargarla, ya que si la ficha llega a estar sobre tiempo de vencimiento, 
se puede cerrar. Por favor guarde el pantallazo y cárguelo en el último seguimiento adjunto. NO dejemos pasar el tiempo.
10. Apoye al aprendiz con los documentos de certificación una vez se evalúa al final su etapa productiva y notifíquenos de la entrega de los mismos, en caso de no 
recibir respuesta por parte del aprendiz, cargue en la carpeta certificados la evidencia de su solicitud y gestión. Y notifíquenos mediante correo electrónico de 
que el aprendiz no entregó los documentos. (recordemos que a los dos años la ficha se vence por tiempo y luego no se pueden adelantar gestiones)

Agradecemos su apoyo que para este proceso y certificación de los aprendices es demasiado importante
Recuerde llevar los documentos en su carpeta asignada en el ONEDRIVE

Cualquier duda estamos para apoyarle

Cordialmente,
Equipo Etapas Productivas
etapasproductivascat@sena.edu.co
(+57) 7248113
Calle 22 N° 9 – 82, San Gil Centro Agroturístico
Regional Santander
            `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Mensaje enviado: %s", info.messageId);
        return info.response;
    } catch (error) {
        console.error("Error en la función sendEmail:", error);
        return error;
    }
}



// correo de asignación al aprendiz

import nodemailer from 'nodemailer';

export const sendEmail2 = async (correo, nombreAprendiz, instructorNombre, instructorEmail, instructorTelefono) => {
    try {
        let pass = process.env.EMAIL_PASS;
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        // Obtener la fecha actual
        const fechaActual = new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const mailOptions = {
            from: '"Etapas Productivas SENA" <etapasproductivascat@sena.edu.co>',
            to: correo,
            subject: "ASIGNACIÓN DE INSTRUCTOR PARA REALIZACIÓN SEGUIMIENTO",
            text: `
    Fecha: ${fechaActual}
    
    Cordial saludo apreciado aprendiz ${nombreAprendiz},
    
    De manera atenta me permito informar que, de acuerdo con lo establecido en el reglamento del
     aprendiz se asigna como instructor de seguimiento al instructor:
    
    ${instructorNombre}
    ${instructorEmail}
    ${instructorTelefono}
    
    para que realice la gestión de contacto e inicie los seguimientos lo más pronto posible.
    
    ARTÍCULO 14. SEGUIMIENTO Y EVALUACIÓN DE LA ETAPA PRODUCTIVA. El seguimiento a 
    la etapa productiva es obligatorio y se realizará de manera virtual y presencial. El Aprendiz 
    elaborará una bitácora quincenal, en la que señalará las actividades adelantadas en
    desarrollo de su etapa productiva en cualesquiera de las alternativas, para que 
    el Instructor asignado como responsable pueda hacer seguimiento de acuerdo a los 
    indicadores establecidos en el procedimiento de ejecución de la formación, garantizando 
    una interacción continua entre el Aprendiz y el Instructor; esta actividad se debe 
    complementar con visitas o comunicación directa que realice el Instructor.

    PARÁGRAFO: Si el Aprendiz no alcanza los resultados de aprendizaje de la etapa
    productiva se procederá a realizar comité de evaluación quien analizará el caso para emitir 
    los juicios evaluativos finales, si los juicios no alcanzan los resultados de aprendizaje de la 
    etapa productiva se procederá a cancelar la matrícula, previo agotamiento del debido proceso.
    
    Recuerde la importancia de llevar un correcto seguimiento tomando como base:
    1. El primer seguimiento debe hacerse cuanto antes para acordar las actividades con su coformador(jefe)
    2. Son en total 3 seguimientos (iniciando, a mitad y finalizando)
    3. Asegúrese de guardar las evidencias ya que cada 15 días debe presentar una bitácora (es su actividad 
    quincenal, no deje acumular ya que de lo contrario puede ser citado a comité por falta académica de su 
    deber), estas evidencias pueden ser informes, fotografías, documentos, registros, facturas, documentos, 
    correos etc... En total son 12 bitácoras y debe estarlas realizando desde el día que inició su etapa 
    productiva.
    4. Maneje el correo y el drive que compartirá su instructor de seguimiento
    5. Las firmas de los documentos son muy importantes ya que convalidan la autenticidad del documento
    6. Revise sus fechas, recuerde que las fichas se vencen por tiempo y hay unos tiempos máximos (2 años 
    al finalizar su lectiva) para realizar su etapa productiva y el trámite de certificación, no deje pasar estos 
    tiempos ya que puede ser declarado en deserción.
    
    Agradezco estar atentos al correo electrónico, medio en donde la instructora se estará presentando.
    
    Adjunto documentos. puede consultarlos en el siguiente enlace:
    https://drive.google.com/drive/folders/1e3naiLl-e6kRF6_rfKp_rwDt2BTUEXXc?usp=sharing
    
    Cualquier duda o problema comuníquese con nosotros
    NOTA: Si se presenta alguna inconsistencia como problemas de comunicación con el instructor e 
    incumplimiento de los seguimientos, notificar a este correo para apoyar con la búsqueda de soluciones 
    mantengamos el contacto por cualquier novedad. Al igual recuerde el reglamento del aprendiz y que en 
    este momento usted aun hace parte del SENA, Es trabajo conjunto para culminar con éxito y lograr la 
    certificación.
    
    Quedamos atentos
    
    Cordialmente,
    Equipo Etapas Productivas
    etapasproductivascat@sena.edu.co
    (+57) 7248113
    Calle 22 N° 9 – 82, San Gil Centro Agroturístico
    Regional Santander
                `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Mensaje enviado: %s", info.messageId);
        return info.response;
    } catch (error) {
        console.error("Error en la función sendEmail:", error);
        return error;
    }
}

// Notificaciones de vecimiento de ficha 
export const sendEmail3 = async (correo, nombreAprendiz, mesesRestantes, mesesParaRegistro) => {
    try {
        let pass = process.env.EMAIL_PASS;
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        // Obtener la fecha actual
        const fechaActual = new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const mailOptions = {
            from: '"Etapas Productivas SENA" <etapasproductivascat@sena.edu.co>',
            to: correo,
            subject: "¡Atención! Se acorta el tiempo para finalizar su formación en el SENA – Regularice su etapa productiva y certifíquese",
            text: `
Cordial saludo estimado aprendiz ${nombreAprendiz},

El motivo de este correo es INFORMARLE desde la coordinación académica del Centro Agroturístico SENA San Gil,
que le hacen falta ${mesesRestantes} MESES para finalizar los dos años que tiene disponible para culminar su proceso de
formación en el Sena y a la fecha usted tiene resultados de aprendizaje pendientes y/o el resultado relacionado 
con su etapa práctica.

*Si usted tiene pendiente competencias de la etapa lectiva por favor comunicarse con el instructor encargado de
 la competencia y/o con el coordinador(a) Académico del programa.

*Si usted tiene pendiente el resultado de aprendizaje de etapa productiva, le recordamos que existen diferentes
 alternativas: CONTRATO DE APRENDIZAJE, VINCULO LABORAL, PASANTÍA (VINCULO FORMATIVO), APOYO A UNA
 ORGANIZACIÓN ESTATAL O ONG SIN ANIMO DE LUCRO, UNIDAD PRODUCTIVA FAMILIAR, PROYECTO PRODUCTIVO

Para modalidad contrato de aprendizaje comunicarse al correo dlalfonso@sena.edu.co; las alternativas diferentes
a Contrato de aprendizaje se debe solicitar el registro ante el coordinador académico al correo
etapasproductivascat@sena.edu.co, para esto usted debe tener aprobado el 100% de las competencias de la
Etapa Lectiva y que no hayan transcurrido más de 18 meses después de terminar la etapa lectiva. Dado lo anterior 
le informamos que le quedan ${mesesParaRegistro} MESES para registrar la alternativa elegida ante el coordinador académico.

Nota:
1. Si se encuentra desarrollando su etapa productiva por favor hacer CASO OMISO a este correo y continuar con su
 proceso con el instructor asignado.
2. Si se encuentra Por Certificar o Certificado por favor hacer CASO OMISO a este correo y continuar con su proceso
 de certificación.

Si usted tiene alguna duda sobre el tema por favor acercarse al centro de formación a la oficina de seguimiento a
etapa productiva para revisar su situación o responder a este correo electrónico.

COMPARTO INFORMACION DE LA FICHA EN LA QUE SE ENCUENTRA MATRICULADO

CODIGO FICHA: 2504381
CODIGO PROGRAMA: 228118
VERSION PROGRAMA: 1
NOMBRE PROGRAMA: ANALISIS Y DESARROLLO DE SOFTWARE
NIVEL FORMACION: TECNÓLOGO

Cordialmente,
Equipo Etapas Productivas
etapasproductivascat@sena.edu.co
(+57) 7248113
Calle 22 N° 9 – 82, San Gil Centro Agroturístico
Regional Santander
  `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Mensaje enviado: %s", info.messageId);
        return info.response;
    } catch (error) {
        console.error("Error en la función sendEmail:", error);
        return error;
    }
}