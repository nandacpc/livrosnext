import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css"
import { Livro } from "@/classes/modelo/Livro";
import { LinhaLivro } from "@/componentes/LinhaLivro";
import { Menu } from "@/componentes/Menu";
import Head from "next/head";

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        obter().then((livros) => {
            setLivros(livros);
            setCarregado(true);
        });
    }, [carregado]);

    const baseURL = "http://localhost:3000/api/livros";

    const obter = async () =>{
        const obterLivros = await fetch(baseURL);    
        return obterLivros.json();
    };

    const excluirLivro = async (codigo:number) => {
        const resposta = await fetch(`${baseURL}/${codigo}`, {method:'DELETE'});
        return resposta.ok;    
    };

    const excluir = async (codigo:number) =>{
        await excluirLivro(codigo);
        setCarregado(false);
    }
    return(
        <div className={styles.container}>
            <Head>
                <title>Loja Next</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Menu />
            <main className={`${styles.main}`}>
                <h1 className={`${styles.title} display-2`}>Livros</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
                        ))};
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;







