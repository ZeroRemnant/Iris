import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { controller, messages, regex } from "../../util";
import ErrorDialog from "../Dialogs/ErrorDialog";

function UpdateProveedor({ id = "" }) {
  let [proveedor, setProveedor] = useState({
    rfc: "", //Text
    razon: "", //Text
    domicilio: "", //Text
    telefono: "", //Number
    correo: "", //Text
    cuenta: 0, //Number
  });

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      const data = await controller.SupplierController.getSupplierByRFC(id);
      proveedor.rfc = data.rfc;
      proveedor.razon = data.razon_social;
      proveedor.domicilio = data.domicilio;
      proveedor.correo = data.correo_electronico;
      proveedor.cuenta = data.cuenta_bancaria;
      proveedor.telefono = data.telefono;
    }
    getData();
  }, []);

  let [isError, setIsError] = useState(false);

  /* Controls modal state */
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const updateCard = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isOpen) {
      const sup = new controller.Supplier(
        proveedor.rfc,
        proveedor.razon,
        proveedor.domicilio,
        proveedor.correo,
        proveedor.telefono,
        proveedor.cuenta.toString()
      );
      if (await controller.SupplierController.updateSupplier(sup)) {
        console.log(sup);
        closeModal();
        window.location.reload();
      } else {
        setIsError(true)
      }
    }
  };

  return (
    <>
      {/* Button in the card */}
      <button
        className="card-button bg-green-600 hover:bg-green-500"
        onClick={openModal}
      >
        <FaPen size={16} color="white" />
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="modal-panel">
                  <form className="m-4" onSubmit={updateCard}>
                    <div className="mb-6">
                      <label htmlFor="">RFC</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="text-input"
                        value={proveedor.rfc}
                        pattern={regex.rfc}
                        onChange={(e) =>
                          setProveedor({ ...proveedor, rfc: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Razon Social</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={250}
                        className="text-input"
                        value={proveedor.razon}
                        onChange={(e) =>
                          setProveedor({ ...proveedor, razon: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Domicilio</label>
                      <input
                        type="text"
                        id=""
                        name=""
                        maxLength={250}
                        className="text-input"
                        value={proveedor.domicilio}
                        onChange={(e) =>
                          setProveedor({
                            ...proveedor,
                            domicilio: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Teléfono</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        maxLength={10}
                        minLength={10}
                        min={0}
                        className="text-input"
                        value={proveedor.telefono}
                        onChange={(e) =>
                          setProveedor({
                            ...proveedor,
                            telefono: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Correo</label>
                      <input
                        type="email"
                        id=""
                        name=""
                        maxLength={50}
                        className="text-input"
                        value={proveedor.correo}
                        onChange={(e) =>
                          setProveedor({ ...proveedor, correo: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="">Cuenta Bancaria</label>
                      <input
                        type="number"
                        id=""
                        name=""
                        maxLength={50}
                        minLength={16}
                        min={0}
                        className="text-input"
                        value={proveedor.cuenta}
                        onChange={(e) =>
                          setProveedor({
                            ...proveedor,
                            cuenta: parseInt(e.target.value),
                          })
                        }
                        required
                      />
                    </div>

                    <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button type="submit" className="btn-primary">
                        Modificar
                      </button>
                      <button className="btn-danger" onClick={closeModal}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ErrorDialog
        open={isError}
        setIsOpen={setIsError}
        msg={messages.errorUpdate}
      />
    </>
  );
}

export default UpdateProveedor;
