export const FormInput = (props) => {
    return (
    <div className="input-field">
      <i className="fas fa-user"></i>
      <input 
        type={props.type} 
        placeholder={props.placeholder} 
        name={props.name} 
        required 
        ref={props.refer}
      />
    </div>
  )
}

export default FormInput;