export default function ModalContent() {
    return (
        <div className="modal" style={{display: 'flex'}}>
            <div style={{color: 'black'}}>Update is available, reload the page</div>
            <button onClick={() => {        window.location.reload();}}>Reload</button>
        </div>
    );
}
