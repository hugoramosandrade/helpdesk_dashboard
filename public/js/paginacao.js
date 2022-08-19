// Gerando paginação
function generatePaginationApi (meta, html, divID, formID) {

    //Pagina Click recarrega GRID;
    function updatePageAndSubmitForm (pageNumber, formID) {
        $(formID + " #page").val(pageNumber);
        $(formID).submit();
    }

    //Generico passagem pagina
    function changePage (form, action) {
        let page = parseInt($(`${form} #page`).val());
        if (action === 'next') {
            newPage += 1;
        }
        if (action === 'previous') {
            newPage -= 1;
        }
        updatePageAndSubmitForm(newPage, form)
    }
    // Renderizando tabela
    $(divID).html(html)

    let paginationtext = '',
        totalItem = meta.pagination.total,
        totalPage = meta.pagination.total_pages,
        paginaPreview = 0,
        paginaAtual = meta.pagination.current_page,
        page = 1;

    const INTERVALO_PAGINACAO = 8;
    //criando paginação
    paginationtext += '<div class="Page navigation example">';
    paginationtext += '<ul class="pagination">';

    totalItem = meta.pagination.total;
    totalPage = meta.pagination.total_pages;
    paginaAtual = meta.pagination.current_page;

    if (totalPage > INTERVALO_PAGINACAO) {
        if (paginaAtual === 1) {
            page = 1;
        } else {
            let aux = ((totalPage - paginaAtual) + 1);
            let aux2 = INTERVALO_PAGINACAO - aux;
            if (aux2 <= 0) {
                page = 1;
            } else {
                page = aux2;
            }
        }
    } else {
        page = 1;
    }

    if (meta.pagination.links.previous) {
        paginationtext += ' <li class="page-item" id="previousPage">';
        paginationtext += ' <a class="page-link" href="#">';
        paginationtext += '     <span>&laquo;</span>';
        paginationtext += ' </a>';
        paginationtext += '</li>';
    }

    for (page; page <= totalPage; page++) {
        if (paginaPreview != INTERVALO_PAGINACAO) {
            paginationtext += `<li class="page-item" data-page="${page}">`;
            paginationtext += ` <a class="page-link" href="#">`;
            paginationtext += `     ${page}`;
            paginationtext += ' </a>';
            paginationtext += '</li>';
            paginaPreview += 1;
        }

    }

    if (meta.pagination.links.next) {
        paginationtext += ' <li class="page-item"  id="nextPage">';
        paginationtext += ' <a class="page-link" href="#">';
        paginationtext += '     <span>&raquo;</span>';
        paginationtext += ' </a>';
        paginationtext += '</li>';
    }
    paginationtext += '</ul>';
    paginationtext += '</div>';

    paginationtext += '<label> Foram encontrados : ' + totalItem + ' registros </label>';
    // Renderizando paginação
    $(divID).append(paginationtext);

    // Destacando pagina selecionada
    $(`.page-item`).closest(`[data-page="${paginaAtual}"]`).addClass("active");

    // Resetando pagina caso tenha mudança no search do form
    $(".page-item").unbind('click').click(function (e) {
        var pageNumber = $(this).closest('li').data('page');
        updatePageAndSubmitForm(pageNumber, formID);

    });
    $('#nextPage').unbind('click').click(function (e) {
        changePage(formID, "next")
    });
    $('#previousPage').unbind('click').click(function (e) {
        changePage(formID, "previous")
    });

}