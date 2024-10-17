const Alert = ({ type, lead, children }) => {
  return (
    <div className={"alert alert-" + type}>
      <strong className="lead">{lead}</strong>
      {children}
    </div>
  )
}

export default Alert;