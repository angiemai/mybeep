@extends('layouts.app')

@section('page-title') {{ __('crud.management', ['item'=>__('general.permission')]) }}
@endsection

@section('content')
    @component('components/box')
        @slot('title')
            {{ __('crud.overview', ['item'=>__('general.permission')]) }}
        @endslot

        @slot('action')
            @permission('role-create')
                <a href="{{ route('permissions.create') }}" class="btn btn-primary">
                    <i class="fa fa-plus" aria-hidden="true"></i> {{ __('crud.add', ['item'=>__('general.permission')]) }}
                </a>
            @endpermission
        @endslot

        @slot('bodyClass')
        @endslot

        @slot('body')

        <script type="text/javascript">
            $(document).ready(function() {
                $("#table-permissions").DataTable(
                    {
                    "language": 
                        @php
                            echo File::get(public_path('js/datatables/i18n/'.LaravelLocalization::getCurrentLocaleName().'.lang'));
                        @endphp
                    ,
                    "order": 
                    [
                        [ 1, "asc" ]
                    ],
                });
            });
        </script>


        <table id="table-permissions" class="table table-responsive table-striped">
            <thead>
                <tr>
                    <th>#</th><th>Name</th><th>Display Name</th><th>Description</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            @foreach($permissions as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->name }}</td><td>{{ $item->display_name }}</td><td>{{ $item->description }}</td>
                    <td col-sm-1>
                        <a href="{{ route('permissions.show', $item->id) }}" title="{{ __('crud.show') }}"><button class="btn btn-default"><i class="fa fa-eye" aria-hidden="true"></i></button></a>

                        <a href="{{ route('permissions.edit', $item->id) }}" title="{{ __('crud.edit') }}"><button class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i></button></a>

                        <form method="POST" action="{{ route('permissions.destroy', $item->id) }}" accept-charset="UTF-8" style="display:inline">
                            {{ method_field('DELETE') }}
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-danger pull-right" title="Delete" onclick="return confirm('{{ __('crud.sure',['item'=>'permission','name'=>'']) }}')">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>

        <div class="pagination-wrapper"> {!! $permissions->render() !!} </div>

        @endslot
    @endcomponent
@endsection
