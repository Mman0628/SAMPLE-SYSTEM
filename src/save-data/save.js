import axios from "axios";
import Swal from "sweetalert2";

export function saveData(project) { 
    return { 
        project,
        async saveProject(){ 
            if(this.project.status === 'ADD'){
                const result = await Swal.fire({
                    title: `Do you want to add new ${this.project.title}?`,
                    showDenyButton: true, 
                    confirmButtonText: "Yes", 
                })

                if (result.isConfirmed) { 
                    const res = await axios.post('http://192.168.1.174:3000/myApi/insert_project', {data: this.project.data, flag: this.project.flag})
                    if(res.data.success){
                        await Swal.fire({
                            title: res.data.message,
                            text: "",
                            icon: "success",
                            timer: 1500,  
                            showConfirmButton: false 
                        });   
                        
                        return 'saved' 
                    }else{
                        Swal.fire({ 
                        icon: "error",
                        text: res.data.message,
                        title: "ERROR!", 
                        });
                    }   
                }
            }else{
                //edit
                const result = await Swal.fire({
                    title: "Do you want to save the changes?",
                    showDenyButton: true, 
                    confirmButtonText: "Yes", 
                })

                if (result.isConfirmed) { 
                    const res = await axios.post('http://192.168.1.174:3000/myApi/edit_project', {data: this.project.data, flag: this.project.flag})
                    if(res.data.success){
                        await Swal.fire({
                            title: res.data.message,
                            text: "",
                            icon: "success",
                            timer: 1500,  
                            showConfirmButton: false 
                        });     

                        return 'edit saved'
                    }else{
                        Swal.fire({ 
                        icon: "error",
                        text: res.data.message,
                        title: "ERROR!", 
                        });
                    }  
                }  
            }     
        } 
    } 
}