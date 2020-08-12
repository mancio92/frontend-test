import React, {useState, useEffect} from 'react';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import * as clientCredential from '../axios/ClientCredential'
import { useParams, useHistory } from 'react-router-dom';
import dayjs from "dayjs";

const UploadShow = () => {
    const [show, setShow] = useState({});
    const [labels, setLabels] = useState([]);
    const [choosenLabel, setChoosenLabel] = useState(0);
    const {id} = useParams();
    const history = useHistory()

    useEffect(() => {
        clientCredential.labels().then(response => {
            setLabels(response.data.map( lab =>  ( {value: lab.id,  label: lab.name })));
            
        })
    },[])

    useEffect(() => {
        if(labels.length && id){
            clientCredential.showOne(id).then(response => {
                setShow({ ...response.data, start_date: new Date(response.data.start_date),
                    end_date: new Date(response.data.end_date)});
                setChoosenLabel(labels.find(label => label.value == response.data.label_id));
            })
        }
    },[labels])



    const changeValue = (text, type) => {
        setShow({ ...show, [type]: text});
    }

    const changeDate = (date,type) => {
        setShow({ ...show, [type]: date})
    }
    
    const handleChange = (value) => {
        setShow({...show, label_id: value.value });
        setChoosenLabel(value)
    }

    const uploadHandler = () => {
        const start_date = dayjs(show.start_date).format("YYYY-MM-DD h:mm:ss")
        const end_date = dayjs(show.end_date).format("YYYY-MM-DD h:mm:ss")

        if(id){
            clientCredential.editShow(id, {...show, start_date: start_date, end_date: end_date} ).then(response => {
                history.push('/');
            })
        }else{
            clientCredential.createShow( {...show, start_date: start_date, end_date: end_date} ).then(response => {
                history.push('/');
            })
        }
    }

    return(
        <>
        
            <input type='text' value={show.name} placeholder='name' onChange={(event) => changeValue(event.target.value, 'name') }/>
            <input type='text' value={show.description} placeholder='description' onChange={(event) => changeValue(event.target.value, 'description') }/>

            <DateTimePicker
                onChange={(date) => changeDate(date,'start_date')}
                value = {show.start_date}
                format ={ "y-MM-dd h:mm:ss"}
            />

            <DateTimePicker
                onChange={(date) => changeDate(date,'end_date')}
                value = {show.end_date}
                format = "y-MM-dd h:mm:ss"
            />

            <Select
                value={choosenLabel}
                onChange={handleChange}
                options={labels}
            />

            <button onClick={() => uploadHandler()}>Upload</button>
        </>
    )
}


export default UploadShow