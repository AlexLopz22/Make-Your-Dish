import '../App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Recetas() {
    return (
        <>
            <Header />
            <div className='w-full p-5 flex flex-col justify-center'>
                <div className='w-4/5 mx-auto p-3'>
                    <div className='text-3xl mb-5'>Recetas</div>
                    <div className='flex'>
                        <div className='bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 w-1/4'>
                            <form action="#">
                                <div className='texto-normal'>Dificultad</div>
                                <ul className='p-4'>
                                    <li><input type="checkbox" name="dificultad-facil" id="dificultad-facil" /> Fácil</li>
                                    <li><input type="checkbox" name="dificultad-media" id="dificultad-media" /> Media</li>
                                    <li><input type="checkbox" name="dificultad-dificil" id="dificultad-dificil" /> Difícil</li>
                                </ul>
                                <hr />
                                <br />
                                <div className='texto-normal'>Tiempo de preparación</div>
                                <ul className='p-4'>
                                    <li><input type="checkbox" name="menos-10" id="menos-10" /> &lt;10 minutos</li>
                                    <li><input type="checkbox" name="entre-10-20" id="entre-10-20" /> 10-20 minutos</li>
                                    <li><input type="checkbox" name="entre-20-30" id="entre-20-30" /> 20-30 minutos</li>
                                    <li><input type="checkbox" name="mas-30" id="mas-30" /> &gt;30 minutos</li>
                                </ul>
                                <hr />
                                <br />
                                <div className='texto-normal'>Ingrediente principal</div>
                                <ul className='p-4'>
                                    <li>
                                        <select name="ingrediente-principal" id="ingrediente-principal">
                                            <option value="berenjena">Berenjena</option>
                                            <option value="patata">Patata</option>
                                            <option value="manzana">Manzana</option>
                                        </select>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className='w-3/4 pl-5'>
                            <div className='grid grid-cols-3 gap-2.5'>
                                <div className='border-2 flex flex-col'>
                                    <img src="/imagenes/comida-1.webp" alt="A" />
                                    <div className='text-center texto-normal font-medium mb-2'>Salmón a la plancha con rúcula</div>
                                    <div className='w-2/3 self-center justify-between flex'>
                                        <div className='flex flex-col items-center mb-2 w-1/2'>
                                            <img className='w-15' src="/iconos/reloj.webp" alt="Reloj Icono" />
                                            <div>
                                                &lt;10 minutos
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center w-1/2'>
                                            <img className='w-15' src="/iconos/dificultad-icono.png" alt="Reloj Icono" />
                                            <div>
                                                Fácil
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-2 flex flex-col'>
                                    <img src="/imagenes/comida-1.webp" alt="A" />
                                    <div className='text-center texto-normal font-medium mb-2'>Salmón a la plancha con rúcula</div>
                                    <div className='w-2/3 self-center justify-between flex'>
                                        <div className='flex flex-col items-center mb-2 w-1/2'>
                                            <img className='w-15' src="/iconos/reloj.webp" alt="Reloj Icono" />
                                            <div>
                                                &lt;10 minutos
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center w-1/2'>
                                            <img className='w-15' src="/iconos/dificultad-icono.png" alt="Reloj Icono" />
                                            <div>
                                                Fácil
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-2 flex flex-col'>
                                    <img src="/imagenes/comida-1.webp" alt="A" />
                                    <div className='text-center texto-normal font-medium mb-2'>Salmón a la plancha con rúcula</div>
                                    <div className='w-2/3 self-center justify-between flex'>
                                        <div className='flex flex-col items-center mb-2 w-1/2'>
                                            <img className='w-15' src="/iconos/reloj.webp" alt="Reloj Icono" />
                                            <div>
                                                &lt;10 minutos
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center w-1/2'>
                                            <img className='w-15' src="/iconos/dificultad-icono.png" alt="Reloj Icono" />
                                            <div>
                                                Fácil
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-2 flex flex-col'>
                                    <img src="/imagenes/comida-1.webp" alt="A" />
                                    <div className='text-center texto-normal font-medium mb-2'>Salmón a la plancha con rúcula</div>
                                    <div className='w-2/3 self-center justify-between flex'>
                                        <div className='flex flex-col items-center mb-2 w-1/2'>
                                            <img className='w-15' src="/iconos/reloj.webp" alt="Reloj Icono" />
                                            <div>
                                                &lt;10 minutos
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center w-1/2'>
                                            <img className='w-15' src="/iconos/dificultad-icono.png" alt="Reloj Icono" />
                                            <div>
                                                Fácil
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Recetas
