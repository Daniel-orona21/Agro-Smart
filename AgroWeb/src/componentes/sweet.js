import swal from 'sweetalert'

const ops = () => {
    swal({
        title: "Opss.. algo salio mal",
        text: "Por favor, intentalo de nuevo",
        icon: "error",
        buttons: false,
        timer: 2000
    })
}

export default ops